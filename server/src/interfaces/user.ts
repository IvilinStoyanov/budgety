// src/common/interfaces/user.interface.ts

export interface User {
    _id: string;  // Ensure this is a string
    // other user properties
}

// src/common/interfaces/request-with-user.interface.ts

import { Request } from 'express';

export interface RequestWithUser extends Request {
    user: User;
}
