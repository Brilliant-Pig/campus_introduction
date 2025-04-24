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
    // 验证必填字段
    if (!surveyData.username) {
        throw new Error('用户名不能为空');
    }

    // 验证至少一种联系方式
    if (!surveyData.phone && !surveyData.email && !surveyData.qq && !surveyData.wechat) {
        throw new Error('至少需要提供一种联系方式');
    }

    // 处理问题数据
    const questions = surveyData.questions.filter((q) => q.text.trim()).slice(0, 5);

    // 准备保存的数据
    const surveyToSave = {
        username: surveyData.username,
        age: surveyData.age,
        sex: surveyData.sex,
        major: surveyData.major,
        phone: surveyData.phone,
        email: surveyData.email,
        qq: surveyData.qq,
        wechat: surveyData.wechat,
        questions: questions
    };

    return await userDao.saveSurvey(surveyToSave);
};
// 修改 submitAnswer 方法
exports.submitAnswer = async (question, answer) => {
    if (!question || !answer) {
        throw new Error('问题和答案不能为空');
    }
    return await userDao.submitAnswer(question, answer);
};

// 修改 getUnansweredQuestions 方法
exports.getUnansweredQuestions = async () => {
    return await userDao.getUnansweredQuestions();
};
// 获取已回答的问题
exports.getAnsweredQuestions = async () => {
    return await userDao.getAnsweredQuestions();
};
