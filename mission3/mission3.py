#-*- coding: utf-8 -*-
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

GPIO.setup(12, GPIO.OUT)
GPIO.setup(37, GPIO.OUT)

print('순발력 테스트 시작')
print('5초후에 불이 켜집니다')
time.sleep(5)

GPIO.output(12, GPIO.HIGH)

start_time = time.time()

while True:
	detect = GPIO.input(37)
	if detect == 1:
		end_time = time.time()
		break
	time.sleep(0.1)

print(end_time - start_time)
GPIO.output(12, GPIO.LOW)

GPIO.cleanup()
