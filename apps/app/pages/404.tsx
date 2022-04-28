export default function Page404() {
    return (
        <>
            <h1>Not Found</h1>
        </>
    );
}

Page404.getLayout = (page) => {
    return <>{page}</>;
};
