#!/usr/bin/python
#coding=utf-8


'''
策略入口

'''

import common.Constants as c

from flask import Flask, redirect, render_template, \
    request, url_for, session, jsonify

app = Flask(__name__)
app.config.from_object('config')
app.secret_key = 'some_secret'
fileroot = app.config["FILE_ROOT"]
imageurl_prefix = app.config['IMAGEURL_PREFIX']

'''
选项界面
'''
@app.route('/quant_index')
def quant_index():
    return render_template('quant_form.html')


'''
选项界面
'''
@app.route('/choice_index')
def choice_index():
    #return redirect(url_for('strategy_choice'))
    stocktype_list = ['hs300', 'zz500']
    start_date_list = ['2016-1-1', '2017-1-1']
    end_date_list = ['2017-1-1', '2017-8-1']
    stocklist = [('hs300', '2016-1-1', '2017-1-1'), ('zz500', '2017-1-1', '2017-8-1')]

    return render_template('strategy_choice.html')



'''
编码界面
'''
@app.route('/code_index', methods=['POST', 'GET'])
def code_index():
    return render_template('strategy_code.html')

'''
结果展示界面
'''
@app.route('/result_index', methods=['POST', 'GET'])
def result_index():
    return render_template('strategy_result.html')


if __name__ == "__main__":
    app.debug = app.config["DEBUG"]
    app.run('192.168.1.104')
    #app.run()