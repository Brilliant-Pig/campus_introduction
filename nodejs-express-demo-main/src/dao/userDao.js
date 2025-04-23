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
