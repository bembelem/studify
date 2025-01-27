import { Navigator } from "@/entities/Navigator"


export default function RedactorsLayout(props: {children: React.ReactNode}) {
    return (
        <>
            <Navigator />
            {props.children}
        </>
    )
}