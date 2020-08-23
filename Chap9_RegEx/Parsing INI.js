
/*
rules:
1.ignore blank lines
2.ignore lines starting with ;
3.lines wraped in [ ] are section
4.lines that contains lorem=ipsum are properties:value
5.anything else causes error
*/

let testINI=`[tEts]
#======================================================================

# Set detailed log for additional debugging info

DetailedLog=1

RunStatus=1

StatusPort=6090

StatusRefresh=10

Archive=1

# Sets the location of the MV_FTP log file

LogFile=/opt/ecs/mvuser/MV_IPTel/log/MV_IPTel.log

#======================================================================

Version=0.9 Build 4 Created July 11 2004 14:00

ServerName=Unknown

[FTP]

#======================================================================

# set the FTP server active

RunFTP=1

# defines the FTP control port

FTPPort=21

# defines the FTP data port

FTPDataPort=20

# Sets the location of the FTP data directory to catch terminal

FTPDir=/opt/ecs/mvuser/MV_IPTel/data/FTPdata

# FTP Timeout (secs)

FTP_TimeOut=5

# Enable SuperUser

EnableSU=1

# set the SuperUser Name

SUUserName=mvuser

# set the SuperUser Password

SUPassword=Avaya

#

#======================================================================

[FTPS]

#======================================================================

# set the FTPS server active

RunFTPS=0

# defines the FTP control port

FTPPort=990

# defines the FTP data port

FTPDataPort=889

#======================================================================


[TFTP]

#======================================================================

# set the Trivial FTP server active

RunTrivialFTP=1

# defines the Trivial FTP port

TrivialFTPPort=69

# Sets the location of the TFTP data directory for terminal

TFTPDir=/opt/ecs/mvuser/MV_IPTel/data/TFTPdata

#======================================================================

[HTTP]

#======================================================================

# set the HTTP download server active

RunHTTP=1

# defines the HTTP download port

HTTPPort=81

# Sets the location of the HTTP data directory for downloads

HTTPDir=/opt/ecs/mvuser/MV_IPTel/data/HTTPdata

#======================================================================

[HTTPS]

#======================================================================

# set the HTTPS download server active

RunHTTPS=0

# defines the HTTPS download port

HTTPSPort=411

# Sets the location of the HTTPS data directory for downloads

HTTPSDir=/opt/ecs/mvuser/MV_IPTel/data/HTTPSdata

# Sets the location of the CertFile

CertFile=/opt/ecs/mvuser/MV_IPTel/certs/IPTelcert.pem

# Sets the location of the KeyFile

KeyFile=/opt/ecs/mvuser/MV_IPTel/certs/IPTelkey.pem

# Use Client Authorization

ClientAuth=0

# narrow config for Avaya IPTel (TLSV1 using RSA_NULL_SHA)

IPTel=0

# sets the SSL variants if not Avaya IPtel (IPTel=0)

SSLV2=0

SSLV3=0

TLSV1=1

UseProxy=0

ProxyAddr=simon.avaya.com

ProxyPort=9000

#======================================================================

[BACKUP_SERVERS]

#======================================================================

# Run as FileServer for Backup & Update requests - Note this

FileServer=0

# sets whether to download Firmware updates from the primary/

RequestUpdates=0

# sets whether to upload FTP files to the primary/secondary file

RequestBackup=0

# Enable use of the Primary file server

UsePrimarySvr=0

# Primary file server IP address ( or resolvable DNS)

PrimaryIP=192.168.0.13

# Enable use of the Secondary file server

UseSecondarySvr=0

# Secondary file server IP address ( or resolvable DNS)

SecondaryIP=192.168.0.10

# Sets the update interval for Backups & updates ; 1 = min; 2
=hour, 3=day, 4 =month

 UpdateInterval=2

 #Send FTP backup to the customer sever

 CustomFTP=1

 # FTP backup directory customer sever

 CustomFTPDir=home/mvuser/backup

             # FTP backup directory user login name

             CustomFTPUName=tom

             # FTP backup directory user password

             CustomFTPPwd=jerry

             # Enable CDR Backup - enable=1 on both File Server & Client

             CDRBackup=0

                       # Enable BCMS Backup - enable=1 on both File Server & Client

                       BCMSBackup=0

                       # Retain CDR / BCMS copy data for x days ( Receiver always + 1

                       RetainDays=7.0

                       #======================================================================


                       [SNMP]

                       #================================================================

                       #

                       # Validate FTP store with SNMP check

                       UseSNMP=1

# In case the SNMPGET syntax changes you can redefine the commands

# Uncomment the relevant line to override the internal command

#the syntax is "Command + IPADDR + ExtObj + Awk

# the IPADRR is derived from the connection

# Note there are relavant spaces at the start/end of the component

#Command=/usr/bin/snmpget

#Params= -v2c -cpublic

#ExtObject=.1.3.6.1.4.1.6889.2.69.1.4.9.0

#TypeObject=.1.3.6.1.4.1.6889.2.69.1.1.2.0

#Awk=| awk -F \\" '' {print $2 } ''

#================================================================`;
//console.log(testINI);

let result={};
let section=result;
let comments=[];

testINI.split(/\r?\n/).forEach((line,index)=>{
        //console.log(index+1,":",line);
        let match;
       if(match=line.match(/(\w+)=(.*)/)){

            let prop=match[0].split('=')[0];
            let val=match[0].split('=')[1];
           section[prop]=val;

        }else if (match=line.match(/\[(.*)\]/)){
            result[match[1]]={};
            section=result[match[1]];
        }else if (
            line.match(/\#.*/)
       ){
           comments.push(line);
       }
       else if(match=line.match(/^(\r?\n)?(\s+)?$/)){

       }else{
         throw new Error(`Line ${index}:invalid`);

       }


}
);


console.log(result);
