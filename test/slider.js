import {slider, createWrapper} from '../src';



/**
 *
 */
describe(
	'jQuery nstSlider Slider',
	slider(({id, min, max, current, withLabel, isVertical}) => {
		const node = createWrapper(`jquery-nstslider-${id}`);

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
		$slider.appendTo(node);
		$slider.filter('.nstSlider').nstSlider({
			left_grip_selector: '.grip',
			value_changed_callback: function(cause, leftValue) {
				$(node).find('.label').text(leftValue);
			}
		});
		return node;
	}
));
