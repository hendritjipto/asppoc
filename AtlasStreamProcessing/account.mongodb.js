s = {$source : {
    connectionName : "kafka",
    topic : ["account", "account_ex"],
    // config: {
    //     // Earliest to read from the beginning of the topic
    //     auto_offset_reset: "beginning",
    //     group_id: "mongodbatlas1"
    // }
}}

m = {
    $merge: {
        into: {
            connectionName: 'atlas',
            db: 'stream',
            coll: 'account'
        },
        on: ['ACCOUNT_ID'],
        whenMatched: 'merge',
        whenNotMatched: 'insert'
    }
}

u = {
    $unset : [
        "_stream_meta" 
    ]
}

dlq = {dlq: {connectionName: "atlas", db: "stream", coll: "accountDLQ"}}
sp.createStreamProcessor('AccountMerge',[s,m],dlq)
sp.AccountMerge.start()