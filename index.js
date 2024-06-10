const bodyParser = require('body-parser');
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.post('/',async (req,res) => {
        const {content,input} = req.body;
        try {
                const filepath = await path.join(__dirname,'.','temp',`code_${Date.now()}.cpp`);
                 fs.writeFileSync(filepath,content);

                const inpfil = await path.join(__dirname,'.','temp',`input_${Date.now()}.txt`);
                fs.writeFileSync(inpfil,input);

            await exec(`g++ ${filepath} -o ${filepath}.out && ${filepath}.out < ${inpfil}`,(error,stdout,stderr) => {

                    if(error) {
                        return res.send(stderr).status(400);
                    } else {
                        fs.unlinkSync(filepath);
                        fs.unlinkSync(`${filepath}.out`);
                        fs.unlinkSync(inpfil);
                        res.send(stdout);
                    }
                });
        }catch(err) {
            console.log(err);
            res.send(err.message).status(500);
        }
})

app.listen(port,() => {
    console.log(`Listening on ${port}`);
})