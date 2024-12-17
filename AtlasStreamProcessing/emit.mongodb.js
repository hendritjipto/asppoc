src_hard_coded =
{
    $source: {
        connectionName: 'atlas',
        db : "stream",
        coll : ["account"],
        config: {
            fullDocument: "updateLookup",
            pipeline: [
                {
                    $match: {
                        "fullDocument.NAME": { $exists: true },
                        "fullDocument.BBN": { $exists: true }
                    }
                }
            ]
        },
       
    }
}

project = {
    $project: {
        "_id": 0,
        "fullDocument": 1,
    }
}


emit = {
    $emit: {
        connectionName: 'kafka',
        topic: 'bbn',
    }
}

//sp_pipeline = [src_hard_coded];
sp_pipeline = [src_hard_coded,project, emit];
//sp.process(sp_pipeline);
sp.createStreamProcessor("EmitStream", sp_pipeline);
// db.runCommand({startStreamProcessor:"Stream1", workers:1})
sp.EmitStream.start();