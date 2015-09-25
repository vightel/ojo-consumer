FROM heroku/nodejs

# Internally, we arbitrarily use port 3000
EXPORT PORT 3000

# NOTE: you may have to tweak if you use another target platform than Heroku
#
# copy env file and add a source instruction to .bash_profile
# this will be execute when we login (as root)
COPY ./envs.docker.sh /root/envs.docker.sh
COPY ./bash_profile /root/.bash_profile