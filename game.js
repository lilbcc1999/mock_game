//set canvas
const canvas = document.querySelector('canvas')
const c= canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.5

//background settings
const background = new Scene ({

    position: 
    {
        X:0,
        y:0
    },
    imageSrc: './img/background.png'
})
  

//player settings
const player = new Sprite({
    position:
    {
        x: 0, 
        y: 0
    },velocity: 
    {
        x:0, 
        y:10
    },
    color: 'blue',
    offset:
    {
    x:0, 
    y: 0
    } 
    })
    player.draw()

//enemy settings
    const enemy = new Sprite ({
        position:
        {
            x: 970, 
            y: 0
        },
        velocity: 
        {
            x:0, y:10
        },
        color: 'green',
        offset:
        {x:-50, y: 0}  
        })
    
    enemy.draw()

    const key = {
        a: {
            pressed : false
        },
        d: {
            pressed : false
        },
        ArrowRight: {
            pressed : false
        },
        ArrowLeft: {
            pressed : false
        }


    }
    //collision function
    function rcollision({r1,r2})
    {
        return(r1.hb.position.x+ player.hb.width>=r2.position.x &&
            r1.hb.position.x<=r2.position.x+r2.width &&
           r1.hb.position.y+ r1.hb.height>=r2.position.y && 
               r1.hb.position.y+ r1.hb.height<=r2.position.y+r2.height)
    }
    
    //win function
    function Winner({player,enemy,Time})
    {
        clearTimeout(Time)
        if(player.health=== enemy.health)
        {
         document.querySelector('#gameresult').innerHTML = 'DRAW'
         document.querySelector('#gameresult').style.display = 'flex'
        }
        else if (player.health > enemy.health)
        {
         document.querySelector('#gameresult').innerHTML = 'PLAYER 1 WINS'
         document.querySelector('#gameresult').style.display = 'flex'
        }
        else if (enemy.health > player.health)
        {
         document.querySelector('#gameresult').innerHTML = 'PLAYER 2 WINS'
         document.querySelector('#gameresult').style.display = 'flex'
        }
    }
     

    //count time
    let gclock = 50
    let Time 
    function decreaseTimer()
    {
       if (gclock > 0)
       {
        Time = setTimeout(decreaseTimer,1000)
        gclock--
        document.querySelector('#timer').innerHTML = gclock
       }
       if(gclock === 0)
       {     
        Winner({player,enemy,Time})
        document.querySelector('#gameresult').style.display = 'flex'

       }
    } 
    decreaseTimer()

//make things happen
    function animate()
    {
        window.requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0,0,canvas.width,canvas.height)
        background.update()
        player.update()
        enemy.update()
        player.velocity.x = 0
        enemy.velocity.x = 0

       //player move
        if (key.a.pressed && player.lk === 'a'){
            player.velocity.x =-5
        }
        else if (key.d.pressed && player.lk === 'd'){
            player.velocity.x=5
        }
        //enemy move
        if (key.ArrowRight.pressed && enemy.lk === 'ArrowRight'){
            enemy.velocity.x =5
        }
        else if (key.ArrowLeft.pressed && enemy.lk === 'ArrowLeft'){
            enemy.velocity.x=-5
        }
       //collision check
        if (rcollision({r1:player, r2:enemy}) && player.smacking)
            {
                player.smacking =false
                console.log('p1 hit')
                enemy.health -= 20
                document.querySelector('#ehpbar').style.width 
                =enemy.health + '%'
            }
        if (rcollision({r1:enemy, r2:player}) && enemy.smacking)
            {
                enemy.smacking =false
                console.log('p2 hit')
                player.health -= 20
                document.querySelector('#plhpbar').style.width 
                =player.health + '%'
            }
            
            if (enemy.health<=0 || player.health<=0)
            {
                Winner({player,enemy,Time})

            }
    }   
        
    
    window.addEventListener('keydown',(event)=>{

        switch(event.key)
        {
            case 'd':
                key.d.pressed = true
                player.lk = 'd'
            break

            case 'a':
                key.a.pressed = true
                player.lk = 'a'
                break

            case 'w':
               player.velocity.y = -20
                 break

                 case ' ':
                    player.attack()
                      break

                case 'ArrowRight':
                    key.ArrowRight.pressed = true
                    enemy.lk = 'ArrowRight'
                break
    
                case 'ArrowLeft':
                    key.ArrowLeft.pressed = true
                    enemy.lk = 'ArrowLeft'
                    break
    
                case 'ArrowUp':
                    enemy.velocity.y = -20
                    
                     break

        }
    })
  
    window.addEventListener('keyup',(event)=>{

        switch(event.key)
        {
            //player key check
            case 'd':
                key.d.pressed = false
            break

            case 'a':
                key.a.pressed = false
                break
                  //enemy key check
                    case 'ArrowRight':
                        key.ArrowRight.pressed = false
                        enemy.lk = 'ArrowLeft'
                    break
        
                    case 'ArrowLeft':
                        key.ArrowLeft.pressed = false
                        enemy.lk = 'ArrowRight'
                        break   
                        
                        case '0':
                            enemy.attack()
                              break

        }
    })


    animate()