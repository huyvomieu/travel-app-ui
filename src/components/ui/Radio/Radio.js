import { forwardRef } from 'react';

const Radio = forwardRef(({ children, className, ...props }, ref) => (
    <div className="p-2 flex gap-2" {...props}>
        <input ref={ref} type="radio" id="status" name="status" defaultValue={true} defaultChecked />
        <span className="">{children}</span>
    </div>
));
export default Radio;
