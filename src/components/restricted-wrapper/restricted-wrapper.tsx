import React, {useContext} from 'react';
import { PermissionContext } from '@/providers/permission-provider/permission-provider';

type RestrictedWrapperProps = {
    to: number;
    children: React.ReactNode;

};

const RestrictedWrapper = ({to, children}:RestrictedWrapperProps) => {

    const {isAllowedTo} = useContext(PermissionContext);

    if(isAllowedTo(to)){
        return <>{children}</>;
    }

    return null;
};

export default RestrictedWrapper;