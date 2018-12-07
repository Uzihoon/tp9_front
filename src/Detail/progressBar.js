import ProgressBar from 'progressBar.js';

/**
 * @description progress bar rendering function
 * @param barColor
 * @param rate
 */

const progressBar = (barColor, rate) => {
    const bar = new ProgressBar.Circle(progress, {
        color: barColor,
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 40,
        trailWidth: 10,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: barColor, width: 10 },
        to: { color: barColor, width: 10 },
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);
            const value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }

        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '1.8rem';
    bar.animate(rate);
};

export default progressBar;