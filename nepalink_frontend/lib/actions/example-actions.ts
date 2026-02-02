"use server";


export const exampleAction = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { success: true,
        message: "Action completed successfully",
        data: null
     };
}