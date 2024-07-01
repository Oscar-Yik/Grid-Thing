import React, { useState, useEffect } from 'react';
import "../utils/Background.css";

import { colorType, backImgType, themeType } from './../grid-types';

type updateTheme = (newTheme: themeType) => void;

type updateBkgImgs = (newBkgImgs: backImgType[]) => void;

type getFunction = (img_name: string) => Promise<string>; 

type ChangeThemeProps = { 
    colors: colorType, display: boolean, theme: themeType, updateTheme: updateTheme, env_HOSTNAME: string,
    bkgImgs: backImgType[], updateBkgImgs: updateBkgImgs, getImage: getFunction}

export default function ChangeTheme({ colors, display, theme, updateTheme, env_HOSTNAME, bkgImgs, updateBkgImgs, getImage } : ChangeThemeProps) {

    const [allThemes, setAllThemes] = useState<themeType[]>([]);
    
    useEffect(() => {
        if (display) {
            console.log("themes: ", theme)
            fetchThemes().then(data => setAllThemes(data));
        }
    }, [display])

    async function fetchThemes() {
        try {
            const response = await fetch(`http://${env_HOSTNAME}:8082/api/themes`, {method: "GET"});
            if (!response.ok) {
              console.log("Bad Query: fetchThemes()");
            }
            const data = await response.json();
            return data;
        } catch (e) {
            console.log("Error: couldn't get all themes");
        }
    }

    function getBackImg(img_name: string) {
        const image = bkgImgs.find(img => img.name === img_name);
        if (image) {
            return image.imgPath
        } else {
            getImage(img_name)
                .then(new_image_url => {
                    const image_id = img_name.slice(18,-4);
                    const new_image = { id: image_id, name: img_name, imgPath: new_image_url };
                    let bkgImgs_copy = bkgImgs.slice();
                    bkgImgs_copy.push(new_image);
                    updateBkgImgs(bkgImgs_copy);
                    return new_image_url;
                })
                .catch(e => { console.log("something very bad has happened") });
        }
    }


    if (display) {
        return (
            <div className='change-theme' style={{backgroundColor: colors.headerButton}}>
                {allThemes.map(obj => (
                    <div key={obj.name} className='theme-container'>
                        <div className='theme-item' style={{color: colors.headerFont}}>
                            {obj.name}
                        </div>
                        <div className='theme-image'>
                            <img src={getBackImg(obj.backImg)} 
                                 alt="Triceratops" 
                                 onClick={() => updateTheme(obj)}
                                 width="80px"
                                 height="40px"></img>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}