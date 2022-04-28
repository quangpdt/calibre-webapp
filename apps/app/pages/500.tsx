export default function Page500() {
    return (
        <>
            <h1>Internal Server Error</h1>
        </>
    );
}

Page500.getLayout = (page) => {
    return <>{page}</>;
};
