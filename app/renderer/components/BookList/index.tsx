import React, { DragEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card } from 'antd';
import fs from 'fs';
import EPUB from 'epub';
import './index.less';

const { Meta } = Card;

const BookList = () => {
  const history = useHistory();
  const location = useLocation();
  const [bookData, setBookData] = useState<Record<string, any>>([]);
  const handleDrog = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('e.dataTransfer.files', e);
    for (const file of e.dataTransfer.files as any) {
      // 判断文件夹是否存在
      if (!fs.existsSync('books')) {
        // 创建文件夹
        fs.mkdirSync('books');
      }
      // 复制文件到指定文件夹中
      await fs.createReadStream(file.path).pipe(fs.createWriteStream(`books/${file.name}`));
      // console.log(123);
    }
  };

  const handleDragEnter = () => {
    console.log('handleDragEnter');
  };

  const handleDragLeave = () => {
    console.log('handleDragLeave');
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleDragOver');
  };

  const init = async () => {
    console.log('init');
    if (!fs.existsSync('books')) {
      // 创建文件夹
      fs.mkdirSync('books');
    }
    const files = await fs.readdirSync('books');
    console.log('files', files);
    Promise.all((files || []).filter(item => item !== '.DS_Store').map((file) => {
      // console.log('file', file);
      const epub = new EPUB(`books/${file}`);
      return new Promise((resolve) => {
        epub.on('end', () => {
          // eslint-disable-next-line 
          // @ts-ignore
          epub.getImage(epub.metadata.cover, (err, img, mimeType) => {
            // eslint-disable-next-line 
            // @ts-ignore
            epub.imgUrl = img ? `data:${mimeType};base64,` + img.toString('base64') : null;
            resolve(epub);
          });
        });
        epub.parse();
      });
    })).then(data => {
      console.log('data', data);
      setBookData(data);
    });
  };

  const openBook = (item: Record<string, unknown>) => {
    history.push("/bookDetail");
  };

  useEffect(() => {
    init();
    console.log('location', location);

  }, []);

  return (
    <div
      styleName='dorp-wrap'
      onDrop={handleDrog}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {bookData.length ? (bookData || []).map((item: Record<string, any>) => {
        const { metadata: { title }, imgUrl } = item;
        return (
          <Card
            key={title}
            hoverable
            style={{ width: '22.5%' }}
            cover={<img style={{ height: 240 }} alt={title} src={imgUrl} />}
            onClick={() => openBook(item)}
            styleName="ant-card"
          >
            <Meta title={title} />
          </Card>
        )
      }) : null}
    </div>
  )
}

export default BookList;