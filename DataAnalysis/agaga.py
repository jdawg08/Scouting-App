import turtle as trtl
win = trtl.Screen()
IMAGE = ("C:/Users/Robotics/Documents/GitHub/ScoutingPASS/DataAnalysis/field_imagev2.gif")
WIDTH = 500
HEIGHT = 300
win.register_shape(IMAGE)
trtl.setworldcoordinates(0,0,WIDTH,HEIGHT)

shape_turtle = trtl.Turtle(shape=IMAGE)
shape_turtle.penup()
shape_turtle.hideturtle()
shape_turtle.goto(WIDTH/2,HEIGHT/2)
shape_turtle.stamp()

painter = trtl.Turtle()
def js_py(x,y):
    y = HEIGHT - y
    return x,y
testList=[{"x":492,"y":281},{"x":468,"y":213},{"x":456,"y":191},{"x":408,"y":144},{"x":372,"y":146},{"x":348,"y":175},{"x":336,"y":207},{"x":324,"y":241},{"x":324,"y":243},{"x":324,"y":245},{"x":312,"y":292},{"x":300,"y":285},{"x":288,"y":277},{"x":276,"y":268},{"x":264,"y":253},{"x":252,"y":242},{"x":204,"y":205},{"x":180,"y":174},{"x":168,"y":160},{"x":156,"y":150},{"x":120,"y":125},{"x":108,"y":117},{"x":84,"y":95},{"x":48,"y":63},{"x":36,"y":49},{"x":0,"y":16}]
start = [testList[0]["x"],testList[0]["y"]]
painter.pencolor('red')
painter.pensize(5)
painter.penup()
painter.goto(js_py(start[0],start[1]))
painter.pendown()
for set in testList:
    xval = set["x"]
    yval = set["y"]
    painter.goto(js_py(xval,yval))
win.mainloop()