rsync -avr -e "ssh -l ubuntu -i /Users/jamildhanani/.ssh/crosswind.pem" --exclude 'node_modules' * crosswind.io:/metal
