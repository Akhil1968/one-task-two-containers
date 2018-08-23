# one-task-two-containers
A demo on AWS ECS service that runs two docker containers in one task

STEPS----

1. Create a EC2 instance using Amazon Linux AMI in a VPC tht has at least two public subnets
2. Install docker and git using https://github.com/Akhil1968/one-task-two-containers/blob/master/install-docker-git.txt
3. Login to AWS and create an ECR repository under ECS
4. Build docker image for api layer and push it to your ECR repository.
5. Create an ECS cluster of at least two EC2 Container Instances
6. Create an application load balancer which balances load on the two container instances created in step 5.
6. Register a taskdef using AWS CLI command in https://github.com/Akhil1968/one-task-two-containers/blob/master/register-taskdef.txt
7. Create an ECS service withing your ECS cluster utilizing the ALB and the taskdef created above.
