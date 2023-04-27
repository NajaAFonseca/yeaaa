---
keywords: fastai
description: Following along the student created lesson plan.
title: 4/24 DevOps for Dev Tools Hacks
toc: true 
badges: true
comments: true
layout: post
---

# AWS Databse Hacks 

### Quiz 1

**What is the main difference between relational and non-relational databases?**

A. Relational databases are only used for structured data, while non-relational databases are only used for unstructured data. <br>
B. Relational databases can easily handle high data volumes, while non-relational databases cannot. <br>
C. Relational databases are based on tables and use SQL, while non-relational databases are based on collections and use JSON-like documents. <br>
D. Relational databases are more expensive than non-relational databases. <br>

**My Answer:**

I think the answer is C because relational databases are based on tables and use SQL (Structured Query Language) to manage data, while non-relational databases are based on collections and use a variety of data models typically use a query language specific to the database. 

**Which AWS database service is best suited for applications that require low-latency speed?**

A. Amazon ElastiCache <br>
B. Amazon Neptune <br>
C. Amazon DocumentDB <br>
D. Amazon RDS <br>

**My Answer:**

The answer is A because Amazon Neptune isn't designed for low latency speed, Amazon DocumentDB may not provide the same performance as ElastiCache, and Amazon RDS also may not provide the same performance as ElastiCache.

**What is the purpose of the code example provided in the lesson?**

A. To demonstrate how to create a table in Amazon Aurora. <br>
B. To show how to query data from a DynamoDB table. <br>
C. To provide an example of how to connect to a database instance in RDS using Python. <br>
D. To showcase how to insert data into a MySQL table. <br>

**My Answer:**

I think the answer is C because the code example is likely demonstrating how to connect to a database instance in RDS using Python.

### Quiz 2

**Which of the following is not an AWS database option?**

A. Amazon RDS <br>
B. Amazon Neptune <br>
C. SQLite <br>
D. Amazon DynamoDB <br>

**My Answer:**

The answer is C because SQLite is not an AWS option.

**Which of the following is a file-based, lightweight RDBMS?**

A. Amazon RDS <br>
B. Amazon Neptune <br>
C Amazon DynamoDB <br>
D. SQLite <br>

**My Answer:**

The answer is D, SQLite.

**Which AWS service enables you to store and query highly connected datasets?**

A. Amazon Relational Database Service (RDS) <br>
B. Amazon DynamoDB <nr>
C. Amazon Neptune <br>
D. Amazon DocumentDB <br>

**My Answer:**

I think the answer is C, beacause Amazon Neptune is an AWS database service that is optimized for storing and querying highly connected datasets.

# Certbot Hacks

### OpenSSL and LibreSSL Notes

**What is Open SSL?**

OpenSSL is a software library that provides a secure communications channel between two devices over the internet. It is an open-source implementation of the SSL and TLS protocols that are used to secure communication over the internet. OpenSSL provides a set of cryptographic functions (encryption, decryption, message authentication, digital signature, + key exchange) that allow software developers to incorporate secure communication capabilities into their applications. It is widely used for securing websites, email communication, and other internet-based services. OpenSSL is available for various operating systems, such as Linux, Windows, and macOS.

**What is LibreSSL?**

LibreSSL is a free and open-source software library that provides secure communication using the SSL and TLS protocols. It is a fork of OpenSSL and aims to provide a more secure and lightweight alternative to OpenSSL. LibreSSL provides the same set of cryptographic functions as OpenSSL, however, it is designed to be more secure and reliable, with a more rigorous development and testing process.

**Security Feature Comparisons between OpenSSL + LibreSSL**

1. Code quality: LibreSSL puts a strong emphasis on code quality and security. It has removed a lot of outdated and insecure code that is still present in OpenSSL, reducing the attack surface and making it less prone to vulnerabilities.

2. Cryptography: LibreSSL uses modern cryptographic algorithms and methods, which are more resistant to attacks than some of the legacy algorithms supported by OpenSSL. For example, LibreSSL has removed support for SSLv2, RC4, and other insecure ciphers.

3. Testing: LibreSSL has an extensive testing suite that is regularly run to ensure the library is functioning correctly and securely. This is in contrast to OpenSSL, which has been criticized for its lack of testing.

4. API design: LibreSSL has a simpler and more streamlined API design, which makes it easier to use and less prone to errors than OpenSSL.

### Certbot Instructions

---
