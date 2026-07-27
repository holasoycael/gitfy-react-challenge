import { render, screen } from '@testing-library/react'

// components JSX
import MarkdownRenderer from './index'
import SkeletonMarkdownRenderer from './skeleton'

describe('<MarkdownRenderer /> components', () => {
  it('should render Skeleton state', () => {
    render(<SkeletonMarkdownRenderer />)
    expect(screen.getByTestId('markdown-renderer__skeleton')).toBeInTheDocument()
  })

  it('should render parsed markdown content', () => {
    render(<MarkdownRenderer content="# Hello World" />)
    expect(screen.getByTestId('markdown-renderer')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
