export default function prismaErrorHandler(err: string) {
    console.log('prisma error message =>', err);
    switch (err) {
        case 'Record to update not found.':
        case 'Record to delete does not exist.':
            return 404;

        default:
            return 500;
    }
}
