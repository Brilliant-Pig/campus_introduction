//控制器的作用：处理请求，返回响应，相当于后端的一个入口处理器
const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');

router.get('/getUserList', async (req, res, next) => {
    const result = await userService.getUserList();
    res.ResultVO(0, '成功', result);
});

router.get('/getUserInfo', async (req, res, next) => {
    const { userId } = req.query; //从请求参数中获取userId
    const result = await userService.getUserInfo(userId);
    res.ResultVO(0, '成功', result);
});
//只选取某个用户信息

router.get('/getUserIdByName', async (req, res, next) => {
    const { userName } = req.query; //从请求参数中获取userName
    const result = await userService.getUserIdByName(userName);
    res.ResultVO(0, '成功', result);
});

router.post('/submitSurvey', async (req, res, next) => {
    try {
        const surveyData = req.body;
        const result = await userService.saveSurvey(surveyData);
        res.json({ code: 0, message: '成功', data: result });
    } catch (error) {
        console.error('提交问卷出错:', error);
        res.status(500).json({ code: -1, message: '提交问卷失败' });
    }
});
// 获取未回答的问题列表
router.get('/getUnansweredQuestions', async (req, res, next) => {
    try {
        const result = await userService.getUnansweredQuestions();
        res.json({ code: 0, message: '成功', data: result });
    } catch (error) {
        console.error('获取未回答问题列表失败:', error);
        res.status(500).json({ code: -1, message: '获取未回答问题列表失败' });
    }
});

// 提交答案
router.post('/submitAnswer', async (req, res, next) => {
    try {
        const { question, answer } = req.body;
        const result = await userService.submitAnswer(question, answer);
        res.json({ code: 0, message: '成功', data: result });
    } catch (error) {
        console.error('提交答案失败:', error);
        res.status(500).json({
            code: -1,
            message: error.message || '提交答案失败',
            // 开发环境下返回更多错误信息
            ...(process.env.NODE_ENV === 'development' && { details: error.stack })
        });
    }
});
