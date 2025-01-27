<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Requests\UpdateWeekRequest;
use App\Http\Services\EventService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Traits\ApiResponses;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    use ApiResponses;

    protected EventService $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Создание нового события.
     */
    public function store(StoreEventRequest $request): JsonResponse
    {
        $event = $this->eventService->createEvent($request->user(), $request->validated());

        return $this->success('Event was successfully created', ['event'=>$event], 201);
    }

    /**
     * Получение всех событий пользователя, отсортированных по времени.
     */
    public function index(Request $request): JsonResponse
    {
        $events = $request->user()->events()->orderBy('date')->orderBy('order')->paginate(10);

        return $this->paginate(
            'Events fetched successfully', 
            (object)$events->items(), 
            [
                'current_page' => $events->currentPage(),
                'total' => $events->total(),
                'per_page' => $events->perPage(),
            ]
        );
    }

    /**
     * Обновление существующего события.
     */
    public function update(UpdateEventRequest $request, $id): JsonResponse
    {
        $event = $this->eventService->updateEvent($request->user(), $id, $request->validated());
        
        return $this->success('Event updated successfully', ['event' => $event]);
    }

    /**
     * Удаление события.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $this->eventService->deleteEvent($request->user(), $id);

        return $this->noContent();
    }

    /**
     * Получение событий недели.
     */
    public function getWeek(Request $request): JsonResponse
    {
        $shift = (int)$request->input('shift');

        if (Carbon::now()->isSunday()) {
            $shift++;
        }

        $week = $this->eventService->getWeekEvents($request->user(), $shift);
        return $this->success("Week fetched successfully", ['week'=>$week]);
    }

    /**
     * Обновление всех событий недели. (старая функция)
     */

    //  public function updateWeek(UpdateWeekRequest $request): JsonResponse
    //  {
    //     $weekData = $request->validated();

    //     DB::beginTransaction();
    
    //     foreach ($weekData['week'] as $day => $events) {
    //         foreach ($events as $eventData) {

    //             if (isset($eventData['id'])) { // Если установлен id то надо обновить ивент

    //                 $this->eventService->updateEvent($request->user(), $eventData['id'], $eventData);

    //             } else {
    //                 // Если это новое событие, проверяем обязательные поля
    //                 Validator::make($eventData, [
    //                     'subject' => 'required|string',
    //                     'room' => 'required|string|max:255',
    //                     'order' => 'required|integer|between:1,8',
    //                     'date' => 'required|date',
    //                 ])->validate();

                        
    //                 $this->eventService->createEvent($request->user(), $eventData);
    //             }
    //         }
    //     }

    //     DB::commit();
    //     return $this->success('Events updated successfully');
    // }
    
    /**
     * Обновление всех событий недели. 
     */
    public function updateWeek(UpdateWeekRequest $request): JsonResponse
    {
        DB::beginTransaction();

        $shift = (int)$request->shift;
        $weekData = $request->validated();
        $user = $request->user();

        // Собираем ID всех событий из запроса
        $providedEventIds = $this->eventService->processWeekEvents($user, $weekData['week']);

        // Получаем даты текущей недели
        [$startOfWeek, $endOfWeek] = $this->eventService->getWeekDates($shift);

        // Удаляем события, которых нет в запросе
        $this->eventService->deleteMissingEvents($user, $startOfWeek, $endOfWeek, $providedEventIds);

        DB::commit();

        return $this->success('Events updated successfully');
    }


    /**
     * Удаление всей недели.
     */
    public function deleteWeek(Request $request): JsonResponse
    {
        $shift = (int)$request->shift;
        $startOfWeek = Carbon::now()->startOfWeek()->addWeeks($shift);
        $endOfWeek = $startOfWeek->copy()->endOfWeek();

        $this->eventService->deleteWeekEvents($request->user(), $startOfWeek, $endOfWeek);

        return $this->noContent();
    }
    
}