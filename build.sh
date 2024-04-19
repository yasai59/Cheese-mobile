#!/bin/zsh
# this is only intended for debug and local testing purposes
alias bundletool="java -jar /home/yasai/Public/bundletool-all-1.15.6.jar"
eas build -p android --local --output=cheese.aab
bundletool build-apks --bundle=./cheese.aab --output=./cheese.apks --mode=universal --ks=./key.ks --key-pass=pass:123456 --ks-key-alias=alias --ks-pass=pass:123456
unzip -p cheese.apks universal.apk > cheese.apk
rm cheese.aab cheese.apks
echo cheese.apk is ready to install