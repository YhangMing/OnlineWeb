$(document).ready(function () {

    $('#con-button').click(function () {
        let add = $('#add-brooker').val()
        client = mqtt.connect(add)

        // ON CONNECT
        client.on('connect', function () {
            $('#stat-brooker').val('Connected!')

            $('#sub-button').click(function () {
                let subTopic = $('#sub-topic').val()
                let stamp = new Date().toLocaleString('en-us', { date: 'long' });
                $('#sub-tbl tbody').prepend('<tr><td>' + subTopic + '</td><td>' + stamp + '</td></tr>')
                client.subscribe(subTopic, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            })

        })

        // ON MESSAGE
        client.on('message', function (topic, message) {
            // message is Buffer
            let tpc = topic.toString();
            let msg = message.toString();
            let stamp = new Date().toLocaleString('en-us', { date: 'long' });
            $('#inc-tbl tbody').prepend('<tr><td>' + tpc + '</td><td>' + msg + '</td><td>' + stamp + '</td></tr>')
            //   client.end()
        })
    })
    // wss://test.mosquitto.org:8081/mqtt

    $('#dis-button').click(function () {
        client.end()
        setTimeout(function () {
            $('#stat-brooker').val('Disconnected!')
            setTimeout(function () {
                $('#stat-brooker').val('Press Connect!')
            }, 3000);
        }, 1000);
    })

    $('#pub-btn').click(function () {
        let pub = $('#topic-pub').val()
        let payload = $('#input-pub').val()
        let stamp = new Date().toLocaleString('en-us', { date: 'long' });
        client.publish(pub, payload)
        $('#pub-table tbody').prepend('<tr><td>' + pub + '</td><td>' + payload + '</td><td>' + stamp + '</td></tr>')
    })







})

