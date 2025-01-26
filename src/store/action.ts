import { createAction } from '@reduxjs/toolkit';
import { PathRoutes } from '../data/routes';


export const redirectToRoute = createAction<PathRoutes>('REDIRECT_TO_ROUTE');
