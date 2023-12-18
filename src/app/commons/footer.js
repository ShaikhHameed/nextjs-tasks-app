

export default function Footer(){

    const date = new Date();
    const fullYear = date.getFullYear()


    return(

        <>
            <p className="text-center small text-secondary">Task App© {fullYear}.</p>
        </>
    )
}