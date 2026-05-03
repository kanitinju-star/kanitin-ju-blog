import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function LoginAlertDialog({ open, onOpenChange }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white rounded-3xl border border-brown-200">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-headline-3 font-bold text-brown-600 text-center">
                        Create an account to continue
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-body-2 text-brown-500 text-center">
                        Join our community to like posts, leave comments, and share your thoughts with others.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-col space-x-0 sm:space-x-0 gap-3 mt-4">
                    <AlertDialogAction className="w-full bg-black !text-white hover:bg-gray-800 rounded-full py-6 font-bold text-body-1">
                        Create account
                    </AlertDialogAction>
                    <div className="text-center text-body-3 text-brown-400">
                        Already have an account? <span className="text-black font-bold cursor-pointer hover:underline">Log in</span>
                    </div>
                    <AlertDialogCancel className="hidden">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
