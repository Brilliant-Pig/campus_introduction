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

exports.saveSurvey = async (surveyData) => {
    const sql = `
        INSERT INTO survey_responses (
            username, 
            age, 
            sex, 
            major, 
            question1, 
            question2, 
            question3, 
            question4, 
            question5,
            phone,
            email,
            qq,
            wechat
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const sqlParams = [surveyData.username, surveyData.age, surveyData.sex, surveyData.major, surveyData.question1, surveyData.question2, surveyData.question3, surveyData.question4, surveyData.question5, surveyData.phone, surveyData.email, surveyData.qq, surveyData.wechat];
    return await db.query(sql, sqlParams);
};
// 获取所有未回答的问题
exports.getUnansweredQuestions = async () => {
    const sql = `
        SELECT 
            question1 AS question
        FROM 
            survey_responses
        WHERE 
            question1 IS NOT NULL AND question1 != '' 
            AND (answer1 IS NULL OR answer1 = '')
        
        UNION
        
        SELECT 
            question2 AS question
        FROM 
            survey_responses
        WHERE 
            question2 IS NOT NULL AND question2 != '' 
            AND (answer2 IS NULL OR answer2 = '')
        
        UNION
        
        SELECT 
            question3 AS question
        FROM 
            survey_responses
        WHERE 
            question3 IS NOT NULL AND question3 != '' 
            AND (answer3 IS NULL OR answer3 = '')
        
        UNION
        
        SELECT 
            question4 AS question
        FROM 
            survey_responses
        WHERE 
            question4 IS NOT NULL AND question4 != '' 
            AND (answer4 IS NULL OR answer4 = '')
        
        UNION
        
        SELECT 
            question5 AS question
        FROM 
            survey_responses
        WHERE 
            question5 IS NOT NULL AND question5 != '' 
            AND (answer5 IS NULL OR answer5 = '')
        
        ORDER BY question
    `;
    return await db.query(sql);
};

// 提交答案到对应的问题字段
exports.submitAnswer = async (question, answer) => {
    // 查找包含该问题且该问题未回答的记录
    const findSql = `
        SELECT username
        FROM survey_responses
        WHERE 
            (question1 = ? AND (answer1 IS NULL OR answer1 = '')) OR
            (question2 = ? AND (answer2 IS NULL OR answer2 = '')) OR
            (question3 = ? AND (answer3 IS NULL OR answer3 = '')) OR
            (question4 = ? AND (answer4 IS NULL OR answer4 = '')) OR
            (question5 = ? AND (answer5 IS NULL OR answer5 = ''))
        LIMIT 1
    `;
    const findParams = [question, question, question, question, question];
    const [record] = await db.query(findSql, findParams);

    if (!record) {
        throw new Error('未找到对应的未回答问题');
    }

    // 更新答案到对应的字段
    const updateSql = `
        UPDATE survey_responses
        SET 
            answer1 = CASE WHEN question1 = ? THEN ? ELSE answer1 END,
            answer2 = CASE WHEN question2 = ? THEN ? ELSE answer2 END,
            answer3 = CASE WHEN question3 = ? THEN ? ELSE answer3 END,
            answer4 = CASE WHEN question4 = ? THEN ? ELSE answer4 END,
            answer5 = CASE WHEN question5 = ? THEN ? ELSE answer5 END
        WHERE username = ?
    `;
    const updateParams = [question, answer, question, answer, question, answer, question, answer, question, answer, record.id];

    return await db.query(updateSql, updateParams);
};
