const userDao = require('../dao/userDao');

exports.getUserList = async () => {
    const userList = await userDao.getUserList();
    return userList;
};

exports.getUserInfo = async (userId) => {
    const userInfo = await userDao.getUserInfo(userId);
    return userInfo;
};

exports.getUserIdByName = async (userName) => {
    const userInfo = await userDao.getUserIdByName(userName);
    return userInfo;
};

exports.saveSurvey = async (surveyData) => {
    if (!surveyData.phone && !surveyData.email && !surveyData.qq && !surveyData.wechat) {
        throw new Error('至少需要提供一种联系方式');
    }
    // 处理问题数据，确保最多5个问题
    const questions = surveyData.questions.slice(0, 5);
    while (questions.length < 5) {
        questions.push({ text: '' });
    }
    const surveyToSave = {
        username: surveyData.username,
        age: surveyData.age,
        sex: surveyData.sex,
        major: surveyData.major,
        question1: questions[0].text,
        question2: questions[1].text,
        question3: questions[2].text,
        question4: questions[3].text,
        question5: questions[4].text,
        phone: surveyData.phone,
        email: surveyData.email,
        qq: surveyData.qq,
        wechat: surveyData.wechat
    };
    return await userDao.saveSurvey(surveyToSave);
};
