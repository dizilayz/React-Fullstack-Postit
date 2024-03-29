'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
    children?: ReactNode
}

const queryClient = new QueryClient();

const queryWrapper = ({ children }: Props) => {
    return <QueryClientProvider client={queryClient} >
        <Toaster/>
        {children}
    </QueryClientProvider>
}

export default queryWrapper;