/**
 * @description gauge rendering function (디자인 버전 바뀐후 사용 안함)
 */
const handleStatusProject = () => {

    const planOpts = {
        angle: 0,
        lineWidth: 0.12,
        radiusScale: 1,
        pointer: {
            length: 0.16,
            strokeWidth: 0.018,
            color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        colorStart: '#6FADCF',
        colorStop: '#009570',
        strokeColor: '#dbdbdb',
        generateGradient: true,
        highDpiSupport: true,

    };
    const presentOpts = {
        angle: 0,
        lineWidth: 0.12,
        radiusScale: 1,
        pointer: {
            length: 0.16,
            strokeWidth: 0.018,
            color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        colorStart: '#6FADCF',
        colorStop: '#e43434',
        strokeColor: '#dbdbdb',
        generateGradient: true,
        highDpiSupport: true,

    };

    const projectOpts = {
        angle: 0.5,
        lineWidth: 0.12,
        radiusScale: 1,
        pointer: {
            length: 0,
            strokeWidth: 0,
            color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        colorStart: '#e7ba85',
        colorStop: '#e7ba85',
        strokeColor: '#f0f0f0',
        generateGradient: true,
        highDpiSupport: true,
       
    };
   

    const plan = document.getElementById('plan_gauge');
    const present = document.getElementById('present_gauge');
    const project = document.getElementById('project_status');

    const planGauge = new Gauge(plan).setOptions(planOpts);
    const presentGauge = new Gauge(present).setOptions(presentOpts);
    const projectGauge = new Donut(project).setOptions(projectOpts);


    planGauge.maxValue = 3000;
    planGauge.setMinValue(0);
    planGauge.animationSpeed = 73;
    planGauge.set(2000);

    presentGauge.maxValue = 3000;
    presentGauge.setMinValue(0);
    presentGauge.animationSpeed = 73;
    presentGauge.set(1000);

    projectGauge.maxValue = 3000;
    projectGauge.setMinValue(0);
    projectGauge.animationSpeed = 73;
    projectGauge.set(1050);
}

export default handleStatusProject;