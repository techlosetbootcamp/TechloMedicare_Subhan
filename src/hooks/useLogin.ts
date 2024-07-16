import {
    handleChange,
    selectEmail,
    selectPassword,
} from "@/store/features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogin = () => {
    const navigate = useRouter();
    const email = useAppSelector(selectEmail);
    const password = useAppSelector(selectPassword);
    const dispatch = useAppDispatch();
    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(handleChange({ name, value }));
    };
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const login = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (login?.ok) {
                toast.success("successfully Logged in");
                navigate.push("/");
            } else if (login?.error) {
                toast.error(login?.error);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleShow = () => {
        setShow((prev) => !prev);
    };
    
    return {
        email,
        password,
        show,
        loading,
        handleChanges,
        handleShow,
        handleSubmit,
    }
}

export default useLogin;