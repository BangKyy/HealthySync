"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try{
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )
        console.log({newuser});

        return parseStringify(newuser);
    } catch (err: any) {
        // check existing user
        if(err && err?.code === 409){
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", err);
    }
};