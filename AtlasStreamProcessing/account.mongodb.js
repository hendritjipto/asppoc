s = {$source : {
    connectionName : "kafka",
    topic : ["account", "account_ex"],
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