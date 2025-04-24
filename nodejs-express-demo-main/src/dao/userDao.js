const db = require(`../utils/dbConnPool/db`);

exports.getUserList = async () => {
    //驼峰命名法：有几个单词组成，除了第一个单词首字母小写，其他单词首字母大写，如：getUserList
    const sql = `
        SELECT
            user_id AS userId,
            user_name AS userName
        FROM
            user_info
    `; //AS代表将前面的命名改为后面的别名
    return await db.query(sql);
};

exports.getUserInfo = async (userId) => {
    const sql = `
        SELECT
            user_id AS userId,
            user_name AS userName
        FROM
            user_info
        WHERE
            user_id = ?
    `; //where条件中使用问号，代表参数，参数值将在后面传入，参数代表筛选条件
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

exports.getUserIdByName = async (userName) => {
    const sql = `
        SELECT
            user_id AS userId,
            user_name AS userName
        FROM
            user_info
        WHERE
            user_name = ?
    `; //where条件中使用问号，代表参数，参数值将在后面传入，参数代表筛选条件
    const sqlParams = [userName];
    return await db.query(sql, sqlParams);
};

// 修改 saveSurvey 方法
exports.saveSurvey = async (surveyData) => {
    // 保存基本信息到 survey_responses
    const surveySql = `
        INSERT INTO survey_responses (
            username, 
            age, 
            sex, 
            major,
            phone,
            email,
            qq,
            wechat
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const surveyParams = [surveyData.username, surveyData.age, surveyData.sex, surveyData.major, surveyData.phone, surveyData.email, surveyData.qq, surveyData.wechat];

    await db.query(surveySql, surveyParams);

    // 保存问题到 qa 表（只保存不重复的问题）
    const questions = surveyData.questions.filter((q) => q.text.trim());
    for (const question of questions) {
        try {
            const qaSql = `
                INSERT INTO qa (question, answer)
                VALUES (?, '')
                ON CONFLICT(question) DO NOTHING  -- 如果问题已存在则不插入
            `;
            await db.query(qaSql, [question.text]);
        } catch (error) {
            console.log('问题已存在，跳过插入:', question.text);
        }
    }

    return { success: true };
};

// 修改 getUnansweredQuestions 方法
exports.getUnansweredQuestions = async () => {
    const sql = `
        SELECT question
        FROM qa
        WHERE answer IS NULL OR answer = ''
        ORDER BY question
    `;
    const result = await db.query(sql);
    return result.map((row) => row.question);
};

// 修改 submitAnswer 方法
exports.submitAnswer = async (question, answer) => {
    const sql = `
        UPDATE qa
        SET answer = ?
        WHERE question = ?
        AND (answer IS NULL OR answer = '')
    `;
    const params = [answer, question];

    const result = await db.query(sql, params);

    if (result.affectedRows === 0) {
        throw new Error('未找到对应的未回答问题或问题已被回答');
    }

    return result;
};
// 获取已回答的问题
exports.getAnsweredQuestions = async () => {
    const sql = `
        SELECT question, answer
        FROM qa
        WHERE answer IS NOT NULL AND answer != ''
        ORDER BY question
    `;
    const result = await db.query(sql);
    return result;
};
