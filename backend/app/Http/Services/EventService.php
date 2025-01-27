<?php

namespace App\Http\Services;

use App\Exceptions\DuplicateEventException;
use App\Exceptions\NotAuthorizedException;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;

class EventService
{
    public function createEvent(User $user, array $data): Event
    {
        $this->validateNewEvent($user, $data);

        $event = $user->events()->create($data);
        return $event;
    }

    public function updateEvent(User $user, int $eventId, array $data): Event 
    {
        $event = Event::findOrFail($eventId);
        if ($user->id !== $event->user_id) {
            throw new NotAuthorizedException; 
        }

        $this->validateUpdatedEvent($user, $event, $data);

        $event->update($data);
        return $event;
    }

    public function deleteEvent(User $user, int $eventId): void 
    {
        $event = Event::findOrFail($eventId);
        if ($user->id !== $event->user_id) {
            throw new NotAuthorizedException; 
        }

        $event->delete();


    }
    public function getWeekEvents(User $user, int $shift): object 
    {

        $startOfWeek = Carbon::now()->startOfWeek()->addWeeks($shift);
    
        $endOfWeek = $startOfWeek->copy()->endOfWeek();

        $events = $user->events()
            ->whereBetween('date', [$startOfWeek, $endOfWeek])
            ->orderBy('date')
            ->orderBy('order')
            ->get();
        
        $week = $this->initializeWeekStructure($events);

        return $week;
    }

    public function deleteWeekEvents(User $user, $startOfWeek, $endOfWeek)
    {
        $user->events()
        ->whereBetween('date', [$startOfWeek, $endOfWeek])
        ->delete();
        
    }

    private function validateNewEvent(User $user, array $data)
    {
        if ($user->events()->where([
            ['date', $data['date']],
            ['order', $data['order']]
        ])->exists()) {
            throw new DuplicateEventException;
        }
    }

    private function validateUpdatedEvent(User $user, Event $event, array $data)
    {
        if (isset($data['date'], $data['order'])) {
            $duplicate = $user->events()
                ->where('date', $data['date'])
                ->where('order', $data['order'])
                ->where('id', '!=', $event->id)
                ->exists();

            if ($duplicate) {
                throw new DuplicateEventException;
            }
        }
    }

    private function initializeWeekStructure($events)
    {
        $week = (object)[
            'monday' => (object)[],
            'tuesday' => (object)[],
            'wednesday' => (object)[],
            'thursday' => (object)[],
            'friday' => (object)[],
            'saturday' => (object)[],
            'sunday' => (object)[],
        ];

        foreach ($events as $event) {
            $day = $event->day;
            $week->$day->{$event->order} = $event;
        }
        unset($week->sunday);
        return $week;
    }

    public function getWeekDates($shift = 0)
    {
        if (Carbon::now()->isSunday()) {
            $shift++;
        }
        $startOfWeek = Carbon::now()->startOfWeek()->addWeeks($shift);
        $endOfWeek = $startOfWeek->copy()->endOfWeek();

        return [$startOfWeek, $endOfWeek];
    }

    public function processWeekEvents(User $user, array $week): array
    {
        $eventIds = [];

        foreach ($week as $day => $events) {
            foreach($events as $event)
                if (isset($event['id'])){
                    $eventIds[] = $event['id'];
                    $this->updateEvent($user, $event['id'], $event);
                } else{
                    $existingEvent = $user->events()->where([['date', $event['date']], ['order', $event['order']]]);
                    if ($existingEvent){
                        $existingEvent->delete();
                    }
                    $createdEvent = $this->createEvent($user, $event);
                    
                    $eventIds[] = $createdEvent->id;
                }
        }
        return $eventIds;
    }

    public function deleteMissingEvents(User $user, Carbon $startOfWeek, Carbon $endOfWeek, $eventIds)
    {   
        $user->events()
        ->whereBetween('date', [$startOfWeek, $endOfWeek])
        ->whereNotIn('id', $eventIds)
        ->delete();
    }
}