//background
class Scene
{
  constructor({position, imageSrc})
  {
    this.position = position
    this.width = 50
    this.height =150
    this.image = new Image()
    this.image.src = imageSrc
  }

    draw()
    {
        c.drawImage(this.image, this.position.x,this.position.y)
    }

    update()
    {
        this.draw()
    }
  }
//character setup
class Sprite
{
    constructor({position,velocity,color='red',offset})
    {
        this.position = position
        this.velocity = velocity
        this.width =50
        this.height =150
        this.health =100
         this.lk
         this.hb ={
            position: {x: this.position.x ,y:this.position.y},
            offset,
            width: 100,
            height: 50
            
         }
         this.color = color
    }
    draw(){ 
        c.fillStyle =this.color
        c.fillRect(this.position.x, this.position.y,this.width, this.height)
       //hitbox
       if (this.smacking){
        c.fillStyle ='purple'
        c.fillRect(this.hb.position.x, 
        this.hb.position.y,
        this.hb.width, 
        this.hb.height)
       }
    }
    update(){
        this.draw()
        this.hb.position.x = this.position.x+this.hb.offset.x
        this.hb.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y+this.height+this.velocity.y >= canvas.height){
            this.velocity.y=0
        } 
        else {
            this.velocity.y+= gravity
        }
    }
    attack(){
        this.smacking =true
        setTimeout(()=>{
            this.smacking =false
        }, 100)
    }
}