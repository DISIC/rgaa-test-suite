import {slider, createWrapper} from '../src';
import {render, createElement} from 'react';
import Rheostat from 'rheostat';



/**
 *
 */
describe(
	'jQuery nstSlider',
	slider(({id, min, max, current, withLabel, isVertical}) => {
		const $slider = $(`
			<div
				class="nstSlider"
				style="position: relative; height: 25px; width: 200px;"
				data-aria_enabled="true"
				data-range_min="${min}"
				data-range_max="${max}"
				data-cur_min="${current}"
			>
				<div
					class="grip"
					style="position: absolute; background: deeppink; width: 25px; height: 25px;"
				>
				</div>
			</div>
			${withLabel ? '<div class="label"></div>' : ''}
		`);

		$slider.filter('.nstSlider').nstSlider({
			left_grip_selector: '.grip',
			value_changed_callback: function(cause, leftValue) {
				$slider.find('.label').text(leftValue);
			}
		});

		return $slider[0];
	}
));

/**
 *
 */
describe(
	'Rheostat',
	slider(({id, min, max, current, withLabel, isVertical}) => {
		const props = {
			max,
			min,
			values: [current]
		};

		const node = document.createElement('div');

		render(createElement(Rheostat, props), node);

		return node;
	}
));
