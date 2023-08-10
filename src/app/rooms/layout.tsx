export default async function RoomLayout({
    children,
    modal,
}: {
    children: React.ReactNode,
    modal: React.ReactNode,
}) {

    return (
        <>
            {modal}
            <div>{children}</div>
        </>
    );
};