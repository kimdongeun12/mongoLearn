
const express = require("express"); //  서버 구동하는 프레임워크
const app = express();
const router = express.Router();


const controller = require("../controllers/todo"); // 컨트롤 하는 메소드 모음


// main
router.get('/', controller.get);

// Write
router.post('/write', controller.write); 

// Edit
router.get('/edit/:id', controller.edit);

// Update
router.post('/update/:id', controller.update);

// Remove
router.get('/remove/:id', controller.remove);


module.exports = router; // 작성한 router func을 내보내기