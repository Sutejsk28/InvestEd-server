import { PythonShell } from "python-shell";

export const predictFraud = (req,res) => {
    const message = req.body.message;

    const options = {
      pythonPath: '/path/to/python',
      scriptPath: '/path/to/python/script',
      args: [message]
    };
  
    PythonShell.run('predict.py', options, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error');
      } else {
        const fraud = Boolean(Number(result[0]));
        res.send({ fraud });
      }
    });
}