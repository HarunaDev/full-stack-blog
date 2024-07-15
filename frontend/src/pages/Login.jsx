import Form from "../components/Form"

function Login(){
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
            <Form route='/api/token/' method='login' />
            </div>           
        </>
    )
}

export default Login