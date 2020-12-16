/** @format */

import { useEffect, useRef } from 'react';

function useListener(ref, eventName, handler) {
	useEffect(() => {
		if (ref.current) {
			const element = ref.current;
			element.addEventListener(eventName, handler);
			return () => element.removeEventListener(eventName, handler);
		}
	}, [eventName, handler, ref]);
}
//DatePicker
const DatePicker = ({
	onChange,
	onFocus,
	onBlur,
	dateAdapter,
	localization,
	...props
}) => {
	const ref = useRef(null);

	useListener(ref, 'duetChange', onChange);
	useListener(ref, 'duetFocus', onFocus);
	useListener(ref, 'duetBlur', onBlur);

	useEffect(() => {
		ref.current.localization = localization;
		ref.current.dateAdapter = dateAdapter;
	}, [localization, dateAdapter]);

	return <duet-date-picker ref={ref} {...props}></duet-date-picker>;
};
export default DatePicker;
