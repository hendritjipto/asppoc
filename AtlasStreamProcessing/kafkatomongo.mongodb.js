s = {
    $source: { connectionName: "kafka", topic: ["prime", "crm"], }
}
m = {
    $merge:
    {
        into:
            { connectionName: 'atlas', db: "stream", coll: "$_stream_meta.source.topic" }
    }
}
sp_pipeline = [s, m];
sp.createStreamProcessor("KafkaMongoStream", sp_pipeline);
sp.KafkaMongoStream.start();

