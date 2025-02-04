import { UserPermission } from '@/types/user.interface';
import React, { createContext } from 'react';

type PermissionContextType = {
    isAllowedTo: (permission: number) => boolean;
}

type PermissionProviderProps = {
    permissions: UserPermission[];
    children: React.ReactNode;
}

const defaultBehaviour: PermissionContextType = {
    isAllowedTo: () => false
}
export const PermissionContext = createContext<PermissionContextType>( defaultBehaviour);

const PermissionProvider = ({permissions, children}:PermissionProviderProps) => {

    const isAllowedTo = (permission: number) => permissions.find((item)=>item.id === permission)? true:false;

    return <PermissionContext.Provider value={{isAllowedTo}}>{children}</PermissionContext.Provider>;
};

export default PermissionProvider;