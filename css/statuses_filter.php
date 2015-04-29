<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => '1274191327-IPRjFc8mijSO2bfXHFuJm4lyD03lpRCQLTLXnlz',
    'oauth_access_token_secret' => 'KIEj9JmHjx2A5yT5NEjWjEcFA621UvZuHYJrWqYGSUQ',
    'consumer_key' => 'U9VQ74TGNcs2A0GCzWefg',
    'consumer_secret' => 'WSrkrvIDtpOHXYzh9OI0DNRFsSxyLWJieKoF8NgCKj0'
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
$url = 'https://stream.twitter.com/1.1/statuses/filter.json';
$requestMethod = 'POST';

/** POST fields required by the URL above. See relevant docs as above **/
$postfields = array(
	'track' => 'Justin'
);

/** Perform a POST request and echo the response **/
$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($postfields)
             ->performRequest();


?>
