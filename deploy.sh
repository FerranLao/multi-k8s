docker build -t ferranlao/multi-client:latest -t ferranlao/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t ferranlao/multi-server:latest -t ferranlao/multi-server:$SHA -f ./server/Dockerfile ./nestserver
docker build -t ferranlao/multi-worker:latest -t ferranlao/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push ferranlao/multi-client:latest
docker push ferranlao/multi-server:latest
docker push ferranlao/multi-worker:latest

docker push ferranlao/multi-client:$SHA
docker push ferranlao/multi-server:$SHA
docker push ferranlao/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=ferranlao/multi-server:$SHA
kubectl set image deployments/client-deployment client=ferranlao/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=ferranlao/multi-worker:$SHA