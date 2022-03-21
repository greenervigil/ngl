#!/usr/bin/perl
##
##  Perl Handler
##

use strict;
use CGI qw/:standard/;
my $requestURI = $ENV{'REQUEST_URI'};
$requestURI =~ s/cengage/thomsonedu/g;
if ($requestURI !~ /.*\.(gif|jpg|jpeg|js|css|png|tmpl)$/) {
        print redirect("/urlredirect/redirect.do?domain=$ENV{'SERVER_NAME'}&uri=$ENV{'REDIRECT_URL'}");
}
else{
	print "Status:404 \n\n";
}
#print "How did I get here? \n\n";



